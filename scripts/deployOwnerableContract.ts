import { toNano } from '@ton/core';
import { OwnerableContract } from '../wrappers/OwnerableContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const ownerableContract = provider.open(await OwnerableContract.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await ownerableContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(ownerableContract.address);

    console.log('ID', await ownerableContract.getId());
}
