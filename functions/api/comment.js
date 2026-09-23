import { handleForm } from '../_lib/mail-form.js';

export const onRequest = (context) => handleForm(context, { isComment: true });
