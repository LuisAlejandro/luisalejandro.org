"use client";

import { useCallback, useMemo, useRef, useState } from "react";

import { Section } from "@components/common/Layout/Section";
import { SectionTitle } from "@components/common/Layout/SectionTitle";
import type { XaggregatorResultItem } from "@lib/xaggregator/types";

const MAX_URLS = 10;
const IMAGE_COLUMNS = 4;

const actionButtonClass =
  "rounded-xl bg-gray-900 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60";

function parseInputUrls(raw: string): string[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

async function copyTextToClipboard(text: string): Promise<void> {
  if (!navigator.clipboard?.writeText) {
    throw new Error("Clipboard not available");
  }
  await navigator.clipboard.writeText(text);
}

async function downloadImageViaProxy(
  imageUrl: string,
  filenameBase: string
): Promise<boolean> {
  const proxyUrl = `/api/xaggregator/image?url=${encodeURIComponent(imageUrl)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) {
    return false;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const disposition = response.headers.get("content-disposition") ?? "";
  const dispositionMatch = disposition.match(/filename="([^"]+)"/);
  let filename = filenameBase;
  if (dispositionMatch) {
    filename = dispositionMatch[1];
  } else {
    const extension = contentType.includes("png")
      ? "png"
      : contentType.includes("webp")
        ? "webp"
        : "jpg";
    filename = `${filenameBase}.${extension}`;
  }

  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = blobUrl;
  anchor.download = filename;
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(blobUrl);
  return true;
}

export default function XaggregatorTool() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<XaggregatorResultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const messageTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const urlCount = useMemo(() => parseInputUrls(input).length, [input]);

  const successfulRows = useMemo(
    () => results.filter((row) => row.ok),
    [results]
  );

  const showMessage = useCallback((message: string) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    setActionMessage(message);
    messageTimeoutRef.current = setTimeout(() => {
      setActionMessage(null);
      messageTimeoutRef.current = null;
    }, 3000);
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setActionMessage(null);

    const urls = parseInputUrls(input);
    if (urls.length === 0) {
      setFormError("Pega al menos una URL de tweet.");
      return;
    }
    if (urls.length > MAX_URLS) {
      setFormError(`Máximo ${MAX_URLS} URLs de tweet permitidas.`);
      return;
    }

    setLoading(true);
    setResults([]);
    try {
      const response = await fetch("/api/xaggregator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });

      let payload: { error?: string; results?: XaggregatorResultItem[] };
      try {
        payload = await response.json();
      } catch {
        setFormError("Respuesta del servidor no válida.");
        setResults([]);
        return;
      }
      if (!response.ok) {
        setFormError(payload.error ?? "No se pudo procesar la solicitud.");
        setResults([]);
        return;
      }

      setResults(payload.results ?? []);
    } catch {
      setFormError("No se pudo conectar con el servidor.");
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyText = async (texts: string[]) => {
    try {
      await copyTextToClipboard(texts.join("\n"));
      showMessage("Texto copiado al portapapeles.");
    } catch {
      setFormError("No se pudo copiar al portapapeles.");
    }
  };

  const handleDownloadImages = async (imageUrls: string[], label: string) => {
    if (imageUrls.length === 0) {
      showMessage("No hay imágenes para descargar.");
      return;
    }

    let succeeded = 0;
    for (let index = 0; index < imageUrls.length; index += 1) {
      const ok = await downloadImageViaProxy(
        imageUrls[index],
        `${label}-${index + 1}`
      );
      if (ok) {
        succeeded += 1;
      }
    }

    if (succeeded === imageUrls.length) {
      showMessage(
        `Se ${succeeded === 1 ? "descargó" : "descargaron"} ${succeeded} imagen${succeeded === 1 ? "" : "es"}.`
      );
    } else if (succeeded === 0) {
      showMessage("No se pudo descargar ninguna imagen.");
    } else {
      showMessage(
        `Se descargaron ${succeeded} de ${imageUrls.length} imagen${imageUrls.length === 1 ? "" : "es"}.`
      );
    }
  };

  const allTexts = successfulRows
    .map((row) => row.text ?? "")
    .filter((text) => text.length > 0);

  const allImages = successfulRows.flatMap((row) => row.images ?? []);

  return (
    <Section>
      <SectionTitle main>Agregador de X</SectionTitle>
      <p className="mb-6 text-lg font-light text-gray-700">
        Esta es una iniciativa para facilitar la extracción de texto e imágenes
        de tweets en el marco de la emergencia causada por el terremoto de 2026
        en Venezuela. Úsala con prudencia.
      </p>
      <p className="mb-6 text-lg font-light text-gray-700">
        Pega hasta {MAX_URLS} URLs de tweet (una por línea) para obtener el
        texto y las imágenes.
      </p>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <label className="block w-full">
          <span className="mb-2 block text-sm font-medium text-gray-700">
            URLs de tweet ({urlCount}/{MAX_URLS})
          </span>
          <textarea
            className="min-h-[160px] w-full rounded-xl border border-gray-200 bg-white p-4 font-mono text-sm focus:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
            placeholder="https://x.com/user/status/1234567890"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            rows={8}
          />
        </label>

        {formError && (
          <p className="text-sm text-red-600" role="alert">
            {formError}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`${actionButtonClass} px-6 py-3`}
        >
          {loading ? "Cargando…" : "Enviar"}
        </button>
      </form>

      {actionMessage && (
        <p className="mb-4 text-sm text-green-700" role="status">
          {actionMessage}
        </p>
      )}

      {results.length > 0 && (
        <div className="mb-24 space-y-4 md:mb-32 lg:mb-40">
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className={`${actionButtonClass} px-4 py-2 text-sm`}
              onClick={() => handleCopyText(allTexts)}
              disabled={allTexts.length === 0}
            >
              Copiar todo el texto
            </button>
            <button
              type="button"
              className={`${actionButtonClass} px-4 py-2 text-sm`}
              onClick={() => handleDownloadImages(allImages, "tweet")}
              disabled={allImages.length === 0}
            >
              Descargar todas las imágenes
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-3 py-2 font-medium">Enlace</th>
                  <th className="px-3 py-2 font-medium">Texto</th>
                  {Array.from({ length: IMAGE_COLUMNS }, (_, index) => (
                    <th key={index} className="px-3 py-2 font-medium">
                      Imagen {index + 1}
                    </th>
                  ))}
                  <th className="px-3 py-2 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, rowIndex) => {
                  const images = row.images ?? [];
                  const paddedImages = Array.from(
                    { length: IMAGE_COLUMNS },
                    (_, index) => images[index] ?? null
                  );

                  return (
                    <tr
                      key={`${row.inputUrl}-${rowIndex}`}
                      className="border-b border-gray-100 align-top"
                    >
                      <td className="max-w-[180px] px-3 py-3">
                        {row.ok && row.link ? (
                          <a
                            href={row.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="break-all text-blue-700 underline"
                          >
                            {row.link}
                          </a>
                        ) : (
                          <span className="break-all text-gray-600">
                            {row.inputUrl}
                          </span>
                        )}
                        {!row.ok && (
                          <p className="mt-1 text-xs text-red-600">
                            {row.error ?? "Error"}
                          </p>
                        )}
                      </td>
                      <td className="max-w-[280px] whitespace-pre-wrap px-3 py-3">
                        {row.ok ? row.text : "—"}
                      </td>
                      {paddedImages.map((imageUrl, index) => (
                        <td key={index} className="px-3 py-3">
                          {imageUrl ? (
                            <a
                              href={imageUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={imageUrl}
                                alt="Imagen del tweet"
                                className="h-20 w-20 rounded object-cover"
                              />
                            </a>
                          ) : (
                            <span className="text-gray-300">—</span>
                          )}
                        </td>
                      ))}
                      <td className="px-3 py-3">
                        {row.ok ? (
                          <div className="flex flex-col gap-2">
                            <button
                              type="button"
                              className={`${actionButtonClass} px-2 py-1 text-xs`}
                              onClick={() =>
                                handleCopyText(row.text ? [row.text] : [])
                              }
                              disabled={!row.text}
                            >
                              Copiar texto
                            </button>
                            <button
                              type="button"
                              className={`${actionButtonClass} px-2 py-1 text-xs`}
                              onClick={() =>
                                handleDownloadImages(
                                  images,
                                  `tweet-row-${row.inputUrl.slice(-6)}`
                                )
                              }
                              disabled={images.length === 0}
                            >
                              Descargar imágenes
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Section>
  );
}
