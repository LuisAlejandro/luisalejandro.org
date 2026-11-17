# A strategy that has to prove itself

Botanas

An automated trading research loop over Freqtrade: hyperopt in five walk-forward passes, a drawdown-adjusted gate that refuses to deploy overfit parameters, nine historical stress regimes, and an agent pair that proposes and implements each change. It traded real money.

**Year:** 2025

**Team:**

- Luis Alejandro Martínez

**Deliverables:**

- Walk-forward training pipeline
- Overfit gate
- Stress-regime suite
- Benchmark automation
- Live deployment

## The Problem

A backtest will tell you almost anything you want to hear. Run enough parameter combinations over a fixed window and one of them always produces a beautiful curve, and that curve is usually the one that dies first when real money touches it. This is the whole discipline of the field, and it is easy to describe and hard to obey when the curve in front of you looks good.

I did not want a bot that trades. I wanted a research loop that **refuses** most of what it produces, and a paper trail explaining why it refused. The strategies are secondary: the value is the gate.

## The Challenge

Overfitting cannot be detected from one number. The pipeline splits time into five consecutive windows and requires each one to survive a hyperopt run on the in-sample slice, then a backtest on the out-of-sample slice that follows it. The score that decides is **walk-forward efficiency**: the out-of-sample Calmar (annualized return over maximum drawdown) divided by the in-sample Calmar. Below **0.2**, the parameters are treated as curve-fitting and the strategy is rolled back to its previous values. Trade counts and downside-day filters were deliberately dropped from the gate, because they reject good low-frequency strategies while letting high-frequency overfit ones through.

Then comes the market itself. A strategy that survives walk-forward can still be destroyed by a regime it never saw, so the loop replays nine real ones: the 2021 bull run, the 2021 crash, the Luna collapse, the grinding bear, the crab market, the halving, Mt. Gox, the yen crash and the tariff shock. Passing all nine says more about a strategy than any single aggregate return.

The operational problems are unglamorous and they are the ones that break the loop. Hyperopt runs for hours per strategy, so it has to run in the background with the right worker count and a timeout, and it has to leave the parameter files exactly as it found them when it fails. Parameters live in two files per strategy (a Python dict and a JSON override) which must stay in sync or the backtest quietly ignores the change. Test runs happen on a rented benchmark machine that has to be created, synced, and destroyed without leaving a bill behind.

## The Product

The loop is a set of scripts over Freqtrade, wrapped in a small Python package with its own CLI. Training runs five passes per strategy. In each, hyperopt optimises on the in-sample window using a Sortino daily loss function with a minimum-trade floor, a backup of the parameter files is taken first, the out-of-sample backtest runs, and **validate** computes the efficiency score. A failure restores the backup and the strategy is skipped with a recorded reason; a success carries forward. The fifth pass is a final hyperopt across the full window with an epoch budget tuned per strategy, from 500 for the light ones to 2,000 for the heavy ones.

After training, a short test re-runs every surviving strategy over the last quarter and the stress suite replays the nine regimes in parallel across all available cores. Both write archives rather than overwriting, so a strategy's history of results stays readable, and a reporter turns the walk-forward JSON into a table that names what was deployed and why anything was skipped.

The research side is where the agents sit. One agent reads the failing analysis report, classifies the strategy by pattern, consults a literature index, and produces a single hypothesis with the metrics that justify it; a second applies that hypothesis to the code, keeping the Python and JSON parameter files in step. Neither is allowed to touch the gate: an improvement still has to survive all five windows. Deployment is a CLI command against the benchmark provider, and the **monthly exports** of every run stay as the audit trail.

## The Results

The loop traded **real money** on a live account, at a small size, with the same gate and the same stress suite that ran in research. Over **three months** that account grew from **$10 to $89**, an **8.9×** return from trading alone, with no deposits along the way.

| Metric                    | Value      |
| ------------------------- | ---------- |
| Live return, three months ($10 → $89) | 8.9× |
| Months trading real money | 3          |

That is a small account, and I would not read a trend into three months of it. It says the strategies that survived the gate held up with real fills, fees and slippage, which is the thing a backtest cannot tell you.

The result I would put first is not a return. It is that the gate did its job on the first strategy it ever judged: RsiquiV5 came back with a walk-forward efficiency of **0.19** against a floor of 0.2, and the run ended with **zero of one strategies deployed** and a line saying exactly why. A backtest that looked like a winner was refused by a script I wrote on purpose to refuse it, before any money was involved.

Volume, for scale: 87 commits, 52 archived backtest runs, nine strategies under continuous test, and a benchmark machine that can be created, synced and destroyed in three commands. The honest caveat is that the research loop improves parameters, not ideas: it cannot invent an edge, it can only stop you from deploying one that is not there.
