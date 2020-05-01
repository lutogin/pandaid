import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { Role, Status } from '../users/users.interface'
import { VolRegisterDto } from './dto/volregister.dto'
import { v4 as uuidv4 } from 'uuid'
import { Status as OrgStatus } from 'src/organizations/organizations.interface'
import { OrganizationsService } from 'src/organizations/organizations.service'
import { OrgRegisterDto } from './dto/orgregister.dto'

@Injectable()
export class RegistrationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly organizationsService: OrganizationsService
  ) {}

  registerVolunteer(volRegisterRequest: VolRegisterDto) {
    this.usersService.addOne({
      role: Role.VOLUNTEER,
      status: Status.NEW,
      name: volRegisterRequest.firstName,
      email: volRegisterRequest.email,
      password: '',
      id: uuidv4()
    })
    return null
  }

  registerOrganization(registerRequest: OrgRegisterDto) {
    this.organizationsService.addOne({
      id: uuidv4(),
      status: OrgStatus.NEW,
      name: registerRequest.name,
      region: registerRequest.region,
      URL: registerRequest.url,
      description: registerRequest.description,
      contactPersonEmail: registerRequest.contactPersonEmail,
      contactPersonPhoneNumber: registerRequest.contactPersonPhoneNumber,
      contactPersonSecondName: registerRequest.contactPersonSecondName,
      contactPersonFirstName: registerRequest.contactPersonFirstName
    })
    return null
  }
}
