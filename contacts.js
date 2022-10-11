// const fs = require("fs").promises;
// const path = require("path");
// console.log(__filename);
// console.log(__dirname);
import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contactsPath = path.join(__dirname, "./db/contacts.json");
// console.log(contactsPath);

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
    // console.table(contacts);
    const contact = contacts.find((el) => el.id === contactId);
    console.log(contact);
  } catch (error) {
    console.log(error);
  }
}
// getContactById("5");

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    // console.table(contacts);
    const newContacts = contacts.filter((el) => el.id !== contactId);
    // console.log(JSON.stringify(newContacts));
    await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, "\t"));
  } catch (error) {
    console.log(error);
  }
}
// removeContact("Rh-0O6P6RFiiQV2TEmhlU");

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    // console.table(contacts);
    const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
    };
    console.log(JSON.stringify(newContact));
    await fs.writeFile(
      contactsPath,
      JSON.stringify([newContact, ...contacts], null, "\t")
    );
  } catch (error) {
    console.log(error);
  }
}
// addContact("Rosy Sim", "rosi@com.ua", "033-333-3333");
