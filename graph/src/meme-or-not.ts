import {
  MarketCreated as MarketCreatedEvent,
  RewardsDistributed as RewardsDistributedEvent,
  VoteCast as VoteCastEvent
} from "../generated/MemeOrNot/MemeOrNot"
import {
  MarketCreated,
  RewardsDistributed,
  VoteCast
} from "../generated/schema"

export function handleMarketCreated(event: MarketCreatedEvent): void {
  let entity = new MarketCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.creator = event.params.creator
  entity.bucketName = event.params.bucketName
  entity.metadata = event.params.metadata
  entity.fileName = event.params.fileName
  entity.endTime = event.params.endTime

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardsDistributed(event: RewardsDistributedEvent): void {
  let entity = new RewardsDistributed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.creator = event.params.creator
  entity.creatorReward = event.params.creatorReward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoteCast(event: VoteCastEvent): void {
  let entity = new VoteCast(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.marketId = event.params.marketId
  entity.voter = event.params.voter
  entity.vote = event.params.vote

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
