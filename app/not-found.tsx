import Image from "next/image";
import Link from "next/link";

import { Container } from "@components/common/Layout/Container";
import { Footer } from "@components/common/Layout/Footer";
import { Heading } from "@components/common/Layout/Heading";
import { SubHeading } from "@components/common/Layout/SubHeading";
import ButtonBar from "@components/Home/ButtonBar";

export default function NotFound() {
  return (
    <>
      <main>
        <Container>
          <div
            id="app"
            className="flex flex-col items-center justify-center w-full h-full pt-15"
          >
            <div className="home inline-block w-full">
              <Link href="/">
                <Image
                  alt=""
                  className="mx-auto"
                  src="/images/logomin.svg"
                  height={200}
                  width={200}
                />
              </Link>
              <Heading className="!text-[10rem] !text-center !py-10">
                404
              </Heading>
              <SubHeading className="!text-center !pb-40">
                The page you are looking for does not exist.
              </SubHeading>
              <ButtonBar />
              <Footer />
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
