# Routes

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

```