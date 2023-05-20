const { program } = require("commander");
require("colors");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listContacts = await contacts.listContacts();
      console.log(`\nSuccessfully received all contacts:\n`.green);
      return console.log(listContacts);

    case "get":
      const oneContact = await contacts.getContactById(id);
      if (oneContact) {
        console.log(`\nSuccessfully get the contact:\n`.green);
      }
      return console.log(oneContact);

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      if (deletedContact) {
        console.log(`\nContact successfully removed:\n`.green);
      }
      return console.log(deletedContact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      if (newContact) {
        console.log(`\nSuccessfully added contact:\n`.green);
      }
      return console.log(newContact);

    case "update":
      const updContact = await contacts.updateContactById(id, {
        name,
        email,
        phone,
      });
      if (updContact) {
        console.log(`\nContact successfully updated:\n`.green);
      }
      return console.log(updContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();
invokeAction(argv);
