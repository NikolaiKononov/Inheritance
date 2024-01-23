import { toNano } from '@ton/core';
import { StopableCounter } from '../wrappers/StopableCounter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const stopableCounter = provider.open(await StopableCounter.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await stopableCounter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(stopableCounter.address);

    console.log('ID', await stopableCounter.getId());
}
