## 6/18/2026
- It probably makes sense to merge the content and schema validation functions into each type, similiar to how schema validation is done within the types already but content validation is not.
- Probably need to add a sort_order to the sections schema because what is given is JSON doesn't always get put into the database in the same order. Appears to be alphabetical.
- Might need to add some kind of error checking / middleware thing for database being locked. (errcode 5)