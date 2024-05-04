import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RepoService } from './repo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MOCK_DATA_REPO } from './data';

describe('RepoService', () => {
  let service: RepoService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    service = new RepoService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Deberia retornar un listado de repositorio', (doneFn) => {
    const mockData = MOCK_DATA_REPO;
    httpClientSpy.get.and.returnValue(of(mockData));

    service.getFirstSixRepo().subscribe((data) => {
      expect(data).toEqual(mockData);
      doneFn();
    });
    // service.getFirstSixRepo().subscribe((data) => {
    //   expect(data).toEqual(mockData);
    //   doneFn(); //Para que de por finalizada la peticion
    // });

    // const req = httpController.expectOne(
    //   'https://api.github.com/users/RicardoMTT/repos?per_page=6'
    // ); //Esperar que se haya hecho una solicitud a esa url y defuelva el mock
    // req.flush(mockData);
    // httpController.verify(); //Verificar que se llamo
  });
});
