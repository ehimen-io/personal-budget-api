# Personal Budget API

An API that allows clients to create and manage a personal budget, following the _Envelope budgeting principles_.

### Envelope Budgeting

The envelope budgeting system divides a user's income into different spending categories—bills, groceries, gas, and so on. Once they have decided how much they should spend on each category, they will take that amount in cash and place it into an _envelope_. Then, only spend what's available in that envelope for that category's bills or purchases.

The aim is to prevent the user from overspending by limiting what is available to spend.

### API Requests

| Request                                                             | Description                                                                                  |
| ------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `GET localhost:5500/envelopes`                                      | _returns all envelopes created in an array_                                                  |
| `GET localhost:5500/envelopes/total-budget`                         | _returns the total budget of all envelopes created as an integer_                            |
| `GET localhost:5500/envelopes/:name`                                | _returns the envelope object associated with `name`_                                         |
| `POST localhost:5500/envelopes`                                     | _creates a new envelope in the envelope array and returns all envelopes created in an array_ |
| `POST localhost:5500/envelopes/transfer?from=id1&to=id2&amount=num` | _transfers `num` amount of money from an envelope with `id1` to an envelope with `id2`_      |
| `PUT localhost:5500/envelopes/:id?name=envelopeName&amount=num`     | _updates an envelope object with a new name `envelopeName` and/or amount `num`_              |
| `DELETE localhost:5500/envelopes/:id`                               | deletes an envelope by its id                                                                |
