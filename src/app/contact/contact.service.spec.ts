import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Contact } from './contact';

import { ContactService } from './contact.service';

describe('ContactService', () => {
  let httpClientSpy: { post: jasmine.Spy };
  let service: ContactService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new ContactService(httpClientSpy as any);
  });

  it('should return success', () => {
    const success = {
      success: true
    };

    httpClientSpy.post.and.returnValue(of(success));

    const contact = Contact.populate({

    });

    service.sendContact(contact).subscribe(
      response => expect(response).toEqual(success, 'expected success'),
      fail
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should report an error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404, statusText: 'Not Found'
    });

    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    const contact = Contact.populate({

    });

    service.sendContact(contact).subscribe(
      response => fail('expected an error, not success'),
      error  => expect(error.error).toContain('test 404 error')
    );

    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });
});
