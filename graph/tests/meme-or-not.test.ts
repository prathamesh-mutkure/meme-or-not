import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { MarketCreated } from "../generated/schema"
import { MarketCreated as MarketCreatedEvent } from "../generated/MemeOrNot/MemeOrNot"
import { handleMarketCreated } from "../src/meme-or-not"
import { createMarketCreatedEvent } from "./meme-or-not-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let marketId = BigInt.fromI32(234)
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let bucketName = "Example string value"
    let metadata = "Example string value"
    let fileName = "Example string value"
    let endTime = BigInt.fromI32(234)
    let newMarketCreatedEvent = createMarketCreatedEvent(
      marketId,
      creator,
      bucketName,
      metadata,
      fileName,
      endTime
    )
    handleMarketCreated(newMarketCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("MarketCreated created and stored", () => {
    assert.entityCount("MarketCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MarketCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "marketId",
      "234"
    )
    assert.fieldEquals(
      "MarketCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "MarketCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bucketName",
      "Example string value"
    )
    assert.fieldEquals(
      "MarketCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "metadata",
      "Example string value"
    )
    assert.fieldEquals(
      "MarketCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fileName",
      "Example string value"
    )
    assert.fieldEquals(
      "MarketCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "endTime",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
