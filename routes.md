# Routes
- [Pages](#pages)
  - [POST /pages](#post-pages)
  - [POST /pages/:id](#post-pagesid)
  - [PATCH /pages/:id](#patch-pagesid)
  - [DELETE /pages/:id](#delete-pagesid)
- [Sections](#sections)
  - [POST /sections](#post-sections)
  - [PATCH /sections/:id](#patch-sectionsid)
  - [DELETE /sections/:id](#delete-sectionsid)
- [Page Sections](#page-sections)
  - [PATCH /page-sections/:id](#patch-page-sectionsid)
  - [DELETE /page-sections/:id](#delete-page-sectionsid)

## Pages

### POST /pages
Creates a new page
```json
{
    "title": "title goes here",
    "slug": "unique slug goes here"
}
```

### POST /pages/:id
Creates a page section
```json
{
    "sectionId": 1,
    "content": {
        "a-field-name": "value"
    }
}
```

### PATCH /pages/:id
Updates a page
```json
{
    "title": "updated title",
    "slug": "and/or updated unique slug"
}
```

### DELETE /pages/:id
Deletes a page

## Sections

### POST /sections
Creates a new section
```json
{
    "name": "contact-us", // must be unique
    "title": "Contact Us",
    "fields": {
        // all properties besides "type" are optional
        "title": { 
            "type": "string",
            "required": true,
            "minLength": 5,
            "maxLength": 100,
        },

        "submissions": {
            "type": "number",
            "required": false,
            "min": 1,
            "max": 100000
        },

        "text-updates": {
            "type": "boolean",
        }
    }
}
```

### PATCH /sections/:id
Updates a section
```json
{
    // needs either name, title, or fields
    "name": "new-name"
}
```

### DELETE /sections/:id
Deletes a section

## Page Sections

### PATCH /page-sections/:id
Updates a page section
```json
{
    "title": "my new title"
}
```

### DELETE /page-sections/:id
Deletes a page section