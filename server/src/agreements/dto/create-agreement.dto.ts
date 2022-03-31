import { RawAgreement } from '../agreement.interface'

type CreateAgreementDtoParams = Omit<RawAgreement, 'id' | 'isActive' | 'addDate'>

export class CreateAgreementDto implements CreateAgreementDtoParams {
  typeId: number
  number: string
  parentId?: number
  beginDate: Date
  endDate?: Date
  contractorNodeId: number
  contractorSegmentId?: number
  addUserId: number
  terminationDate?: Date

  constructor({
    typeId,
    number,
    parentId,
    beginDate,
    endDate,
    contractorNodeId,
    contractorSegmentId,
    addUserId,
    terminationDate
  }: CreateAgreementDtoParams) {
    this.typeId = typeId
    this.number = number
    this.parentId = parentId
    this.beginDate = beginDate
    this.endDate = endDate
    this.contractorNodeId = contractorNodeId
    this.contractorSegmentId = contractorSegmentId
    this.addUserId = addUserId
    this.terminationDate = terminationDate
  }
}