import * as t from 'io-ts'
import { CountryCode, CurrencyCode, TimeZone } from '../commons/types'

export const ProfileId = t.number
export type ProfileId = t.TypeOf<typeof ProfileId>

export const ProfileResponse = t.intersection([
  t.strict({
    /**
     * The ID of the profile that was updated, if successful.
     */
    profileId: ProfileId,

    /**
     * An enumerated success or error code for machine use.
     */
    code: t.string,
  }),
  t.partial({
    /**
     * A human-readable description of the error, if unsuccessful
     */
    details: t.string,
  }),
])
export type ProfileResponse = t.TypeOf<typeof ProfileResponse>

/**
 * The type of account being called
 */
export const AccountInfoType = t.union([t.literal('seller'), t.literal('vendor')])
export type AccountInfoType = t.TypeOf<typeof AccountInfoType>

export const AccountInfo = t.intersection([
  t.strict({
    /**
     * The string identifier for the marketplace associated with this profile.
     * This is the same identifier used by MWS
     */
    marketplaceStringId: t.string,

    /**
     * The string identifier for the ID associated with this account.
     */
    id: t.string,

    /**
     * The type of account being called.
     */
    type: AccountInfoType,
  }),
  t.partial({
    /**
     * The string identifier for the account name.
     */
    name: t.string,
  }),
])
export type AccountInfo = t.TypeOf<typeof AccountInfo>

export const Profile = t.strict({
  /**
   * The ID of the profile.
   */
  profileId: ProfileId,

  /**
   * The country code identifying the publisher(s) on which ads will run.
   */
  countryCode: CountryCode,

  /**
   * The currency used for all monetary values for entities under this profile.
   */
  currencyCode: CurrencyCode,

  /**
   * The optional budget shared by all entities created under this profile.
   * TODO: setup a check for minimums.
   */
  dailyBudget: t.number,

  /**
   * The tz database time zone used for all date-based campaign management and reporting.
   */
  timezone: TimeZone,

  /**
   * Account info.
   */
  accountInfo: AccountInfo,
})
export type Profile = t.TypeOf<typeof Profile>

/**
 * Registers a brand in sandbox. If this call is made to a production endpoint you will receive an error.
 */
export const RegisterBrand = t.strict({
  /**
   * The country in which you wish to register the profile. Can be one of: US, CA, UK, DE, FR, IT, ES, JP, AU
   */
  countryCode: CountryCode,

  /**
   * REQUIRED. Brand name.
   */
  brand: t.string,
})
export type RegisterBrand = t.Type<typeof RegisterBrand>

/**
 * TODO: The docs don't mention them. Need check on API
 */
export const ProfileRegistrationResponse = t.strict({
  profileId: ProfileId,

  code: t.string,

  description: t.string,
})
export type ProfileRegistrationResponse = t.Type<typeof ProfileRegistrationResponse>
