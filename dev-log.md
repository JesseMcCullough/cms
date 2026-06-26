## 6/26/2026
I want to make a bare bones front end that can create a page and then add sections to that page. I'll also add a UI for creating sections so that those sections can be applied to a page. I think I'd like the UI in React, and I don't that I need anything like Next.js because the front end is just a single page app anyway. I would like the option to have routing in the URL so that when you click on something, the address bar gets updated and a change in location is apparent, like /pages, /sections, etc.

1. Install React
2. Figure out how routing is going to be handled
3. Create a bare bones UI for creating a page (not the content of that page, just the page creation itself)
4. Create a bare bones UI for creating a section
5. Create a bare bones UI for adding sections to a page / content of that page
6. Test CMS with a separate consuming front end

## 6/18/2026
- It probably makes sense to merge the content and schema validation functions into each type, similiar to how schema validation is done within the types already but content validation is not.
- Probably need to add a sort_order to the sections schema because what is given is JSON doesn't always get put into the database in the same order. Appears to be alphabetical.
- Might need to add some kind of error checking / middleware thing for database being locked. (errcode 5)