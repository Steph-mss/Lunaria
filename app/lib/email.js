import React from 'react';
import { Resend } from 'resend';
import ContactTemplate from '~/emails/contactemplate';

export async function sendContactEmail({ name, email, message }) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (
      !process.env.RESEND_API_KEY ||
      !process.env.CONTACT_RECEIVER_EMAIL ||
      !process.env.FROM_EMAIL
    ) {
      throw new Error('Missing email environment variables');
    }

    const html = React.createElement(ContactTemplate, { name, email, message });

    return await resend.emails.send({
      from: `Portfolio <${process.env.FROM_EMAIL}>`,
      to: [process.env.CONTACT_RECEIVER_EMAIL],
      subject: `Nouveau message de ${email}`,
      react: html,
      reply_to: email,
    });
  } catch (err) {
    console.error('sendContactEmail failed:', err);
    throw err;
  }
}
