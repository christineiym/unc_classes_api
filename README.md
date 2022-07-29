# unc_classes_api

Code to return class information in a JSON format.
Based in part on Dr. Saba Eskandarian's [COMP_classes repository](https://github.com/SabaEskandarian/COMP_classes).

## Note
This code, and the instructions, are still very much in progress and are not guaranteed to work. They are for educational purposes only.

## Setup Instructions
1) Create a `config.env` file with the following information:
    ```
    PORT=
    CLASS_SEARCH_ENDPOINT=
    REFERRER=
    HEADERS=
    BODY_SETUP=
    ```
    Where to get this information? Follow the instructions at the top of [this linked page](https://github.com/SabaEskandarian/COMP_classes/blob/main/gather_data.py), but copy as node-fetch. For now, I will leave you to figure out what value each environment variable should take, with the hint that you may find use of `JSON.stringify` from Node useful for the HEADERS.

    Alternatively, replace the fetch request in `routes.js` with the desired fetch request. Please beware that the fetch request may contain sensitive information.
2) Run `npm start`.
