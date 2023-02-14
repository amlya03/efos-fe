import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBook, NewBook } from '../book.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBook for edit and NewBookFormGroupInput for create.
 */
type BookFormGroupInput = IBook | PartialWithRequiredKeyOf<NewBook>;

type BookFormDefaults = Pick<NewBook, 'id'>;

interface BookFormGroupContent {
  id: FormControl<IBook['id'] | NewBook['id']>;
  // contoh: FormControl<IBook['contoh']>;
  nama: FormControl<IBook['nama']>;
  app_no_de: FormControl<IBook['app_no_de']>;
}

export type BookFormGroup = FormGroup<BookFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BookFormService {
  createBookFormGroup(book: BookFormGroupInput = { id: null }): BookFormGroup {
    const bookRawValue = {
      ...this.getFormDefaults(),
      ...book,
    };
    return new FormGroup<BookFormGroupContent>({
      id: new FormControl(
        { value: bookRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      // contoh: new FormControl(bookRawValue.contoh),
      nama: new FormControl(bookRawValue.nama),
      app_no_de: new FormControl(bookRawValue.app_no_de),
    });
  }

  getBook(form: BookFormGroup): IBook | NewBook {
    return form.getRawValue() as IBook | NewBook;
  }

  resetForm(form: BookFormGroup, book: BookFormGroupInput): void {
    const bookRawValue = { ...this.getFormDefaults(), ...book };
    form.reset(
      {
        ...bookRawValue,
        id: { value: bookRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BookFormDefaults {
    return {
      id: null,
    };
  }
}
