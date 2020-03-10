import { Operation } from '../operation'
import { Decode } from '../../decorators'
import { AmazonAdTypeURIPrefix } from '../amazon-ad-type-uri-prefix'
import { SnapshotResponse, RequestSnapshotParams, SnapshotId, RecordTypeRequest } from './types'

export class SponsoredProductsSnapshotOperation extends Operation {
  protected resource = `${this.version}/${AmazonAdTypeURIPrefix.SponsoredProducts}/`

  /**
   * Request a file-based snapshot of all entities of the specified type in the account satisfying the filtering criteria
   *
   * @param {RecordTypeRequest} recordType
   * @param {RequestSnapshotParams} params
   * @returns
   * @memberof SponsoredProductsSnapshotOperation
   */
  @Decode(SnapshotResponse)
  public requestSnapshot(recordType: RecordTypeRequest, params: RequestSnapshotParams) {
    return this.client.post<SnapshotResponse>(`${this.resource}${recordType}/snapshot`, params)
  }

  /**
   * Retrieve status, metadata and location of previously requested snapshot
   *
   * @param {SnapshotId} id
   * @returns
   * @memberof SponsoredProductsSnapshotOperation
   */
  @Decode(SnapshotResponse)
  public getSnapshot(id: SnapshotId) {
    return this.client.get<SnapshotResponse>(`${this.resource}snapshots/${id}`)
  }
}