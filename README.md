# quarto-book-gha

🎥 [Video tutorial](https://www.youtube.com/watch?v=o1vncR-CN1s)

This repo contains a [Quarto book](https://quarto.org/docs/books/) template for creating a Quarto book in R that renders automatically when `.qmd` files are pushed to GitHub.

If this is your first Quarto book, I recommend using the [Quarto book template](https://github.com/jtr13/quarto-edav-template) without automatically rendering instead.

## Follow these instructions carefully

*If you have any difficulties or have feedback of any kind, please [file an issue](https://github.com/jtr13/quarto-book-gha/issues) or ask questions in the [Discussions](https://github.com/jtr13/quarto-book-gha/discussions) section.*

### Copy this template (GitHub)

- [ ] 1. Click the green "Use this template" button above and choose "Create a new repository". If you don't see the "Use this template" option, **log in to GitHub**. DO NOT FORK THE REPO.

- [ ] 2. Under "General": give the repository a name and provide a description.

- [ ] 3. Under "Configuration": leave the setting for viewing the repo as "Public". (Otherwise, you will not be able to publish on GitHub Pages).

- [ ] 4. Click "Create repository"

### Change GitHub Actions permisssions (GitHub)

- [ ] 1. You've now left the template page and are viewing your new repo on GitHub. On the home page, click Settings, then Actions, General, and change "Workflow permissions" at the bottom of the screen to "Read and write permissions."

### Copy the repo link (GitHub)

- [ ] 1. Click the green Code button, choose "HTTPS" and copy the link below. It should have the format: https://github.com/[USERNAME]/[REPONAME].git

### Clone the repo (RStudio)

- [ ] 1. Clone your new repo with *File, New Project..., Version Control, Git* in RStudio. You will need to paste the link from the previous step in the Repository URL box. If it's not automatically populated, enter the repo name in the "Project directory name:" box. Choose the location of the project.

### Quarto publish the book *once* locally (Command line)

- [ ] 1. In the command line, type `quarto publish gh-pages`. This is the only time you will do this.

### Check that GitHub Pages is working (GitHub)
      
- [ ] 1. Click the little gear button near "About" on the top right side of the home page of the repo and check the "Use your Github Pages website" box under "Website". Click "Save changes".

- [ ] 2. Click the link and you should see a rendered sample book.

### Edit `_quarto.yml` (RStudio)

- [ ] 1. Change the all caps info in the `title:`, `author:` and `repo-url` fields in the YAML (top) section of `_quarto.yml` to your info. (Note: it's very important to maintain the indenting structure in this file precisely as is -- be careful!)

- [ ] 2. Commit and push changes.

### Check that GitHub Actions is working (GitHub)

- [ ] 1. Click on Actions and check that the workflow is starting.

- [ ] 2. When it's finished, check that the GitHub Pages site looks correct that the links back to GitHub (icon on top left, edit this page / report an issue on right) work properly.

### Workflow

Generally you will want to see what the rendered pages will look like before pushing changes to GitHub. You can do so with the "Render Book" button in the Build tab. Note that rendered `.html` files are never pushed to GitHub: `_book/` is in `.gitingore`. The GitHub Actions workflow begins rendering as soon as a commit is make to the repo, as well as weekly as specified by the schedule in the workflow file. You will receive an email indicating whether the the workflow succeeded or failed. If the latter, check the Actions tab to see what went wrong.

### Optional

- [ ] 1. Choose a theme from [https://bootswatch.com/](https://bootswatch.com/) and replace "cosmo" in `_quarto.yml` with your prefered theme.

### Additional features

Please consult the official guide to **quarto** book websites: [https://quarto.org/docs/books/](https://quarto.org/docs/books/)



