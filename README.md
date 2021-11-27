# CMS

A content management system (CMS) to be used for my websites.

## Planned functionality and design for initial release
**Functionality**
 - Admin login for accessing the CMS
 - Create pages
 - Edit pages
 - Delete pages


**Design**

The design will be minimal and simplistic, but for the initial release, the design will not be the primary focus. Initially, there will be more focus toward the functionality of the CMS than the design. After the functionality is developed for the initial release of the CMS, then the look and feel of the CMS will undergo drastic improvements.

## Creating pages
To create a page, there should be a "New Page" button that proceeds to the *New Page template*. Inside of this template, there should be fields for adding the following page details:
- Page name (for the CMS)
- Page title (for SEO)
- Page URL
- Page description

All the previously listed page details should be prompted for input when the "New Page" button is clicked.

Pages will be comprised of Sections (described below). Any page can use any Section within the /sections folder.


**Sections**

Since a new page has no content initially, the New Page template should be empty at first but with an option to add new content. New content should be added to the page in *Sections*. Sections should be previously written blocks of HTML code that allow for user input, such as a title, a piece of text, or an image. Permissible input will be at each developer's discretion per Section. Sections will live in the /sections folder of a website's root folder.

!["Add new section"](https://jessem.dev/images/pages-new.png "Add new section")
!["New section"](https://jessem.dev/images/pages-new-click.png "New section")
