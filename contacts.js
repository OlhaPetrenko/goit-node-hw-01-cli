import fs from "fs/promises";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { nanoid } from "nanoid";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const fs = require("fs").promises;
// const path = require("path");
// const { nanoid } = require("nanoid"); - потрібна версія 3.3.4

const contactsPath = path.join(__dirname, "./db/contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((el) => el.id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((el) => el.id === contactId);
    if (index === -1) {
      return null;
    }
    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return removedContact;
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };

    await fs.writeFile(
      contactsPath,
      JSON.stringify([newContact, ...contacts], null, 2)
    );
    return newContact;
  } catch (error) {
    console.log(error);
  }
}
// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
// };
