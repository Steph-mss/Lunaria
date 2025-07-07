import React from 'react';
import { Html, Head, Body, Container, Section, Text, Hr } from '@react-email/components';

const ContactTemplate = ({ name, email, message }) => (
  <Html>
    <Head />
    <Body style={main}>
      <Container>
        <Section style={section}>
          <Text style={heading}>📬 Nouveau message de contact</Text>

          <Text style={label}>👤 Nom :</Text>
          <Text style={text}>{name}</Text>

          <Text style={label}>📧 Email :</Text>
          <Text style={text}>{email}</Text>

          <Text style={label}>💬 Message :</Text>
          <Text style={messageStyle}>{message}</Text>

          <Hr />
          <Text style={footer}>Message reçu depuis ton portfolio Remix.</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactTemplate;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
  padding: '20px',
};

const section = {
  backgroundColor: '#ffffff',
  padding: '30px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const heading = {
  fontSize: '20px',
  fontWeight: 'bold',
  marginBottom: '20px',
};

const label = {
  fontWeight: 'bold',
  fontSize: '14px',
  marginTop: '10px',
};

const text = {
  fontSize: '14px',
  marginBottom: '10px',
};

const messageStyle = {
  backgroundColor: '#f0f0f0',
  padding: '15px',
  borderRadius: '5px',
  fontSize: '14px',
  whiteSpace: 'pre-line',
};

const footer = {
  fontSize: '12px',
  color: '#999999',
  marginTop: '30px',
};
