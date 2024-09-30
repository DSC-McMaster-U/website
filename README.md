# GDSC McMaster U Website

Welcome to the GDSC McMaster U Website project repository! 👋

## Table of Contents
- [General Info](#general-info)
- [Technologies Used](#technologies-used)
- [Contribution](#contribution)
- [Installation](#installation)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Features](#features)
- [License](#license)

## General Info
This project aims to create a modern website for the McMaster chapter of Google Developer Student Club (GDSC). The website is designed to provide information about events, resources, and opportunities for students interested in technology and development.

### Technologies Used
Below is an overview of the key technologies utilized in this project. Familiarity with these technologies will be beneficial for making contributions:

- **Remix**: A full-stack web framework that provides a seamless development experience.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development, following Material Design principles.
- **Sanity CMS**: A customizable content management system that allows for easy content updates.
- **Firebase Hosting**: Fast and secure hosting for web applications.
- **GitHub Actions**: CI/CD for automating workflows and deployments.

For more detailed information on each technology, be sure to check out their official documentation.

## Contribution
Everyone in the GDSC McMaster U Chapter is encouraged to contribute to this project! Please take a moment to review our contribution guidelines.

### Contribution Practices
To contribute to the project, follow these steps:

1. **Create a Branch**: Branching can be done directly within Jira by creating a branch from your ticket. This is the easiest way to branch and ensure correct naming conventions. Ensure you branch off from the `main` branch based on your Jira ticket.

2. **Naming the Branch**: Contribution should mainly be made through feature branches off of main. Name your branch using the prefix `feature/` followed by the auto-generated ticket name.
   ```
   feature/YOUR_TICKET_NAME
   ```

3. **Commit Changes**: Make your changes and commit them to your branch. Be sure to write clear and descriptive commit messages.

4. **Push Changes**: Once you are ready, push your changes to the remote repository.

5. **Create a Pull Request**: After pushing changes, create a pull request to merge your feature branch into `main`. Be sure to link your Jira ticket in the pull request description.

6. **Review and Merge**: Your pull request will be reviewed by a team member. Once approved, your changes will be merged into the `main` branch.

7. **Delete Branch**: After your changes have been merged, delete your feature branch to help keep our repository clean.

## Installation
To run this project locally, follow these steps:

1. **Clone the Repository**: Clone the repository to your local machine using the following command:
   ```bash
   git clone
   ```
2. **Install Dependencies**: Navigate to the project directory and install the project dependencies using npm:
   ```bash
   npm install
   ```

3. **Start the Development Server**: Run the following command to start the development server:
   ```bash
   npm run dev
   ```

4. **Open in Browser**: Visit `http://localhost:5173` in your browser to view the project.

## Deployment
This project is deployed using Firebase Hosting. To deploy the project, follow these steps:

1. **Build the Project**: Use the following command to build the project for deployment:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**: Deploy the project to Firebase Hosting with the following command:
   ```bash
   firebase deploy
   ```

3. **Open in Browser**: Visit the provided URL to view the live deployment of the project.

## Project Structure
The project structure is organized as follows:

```bash
website
├── public
│   ├── favicon.ico
│   └── index.html
├── app
│   ├── lib
│   │   ├── ...    
│   ├── components
│   │   ├── ...
│   ├── routes
│   │   ├── ...
│   ├── types
│   │   ├── ...
│   ├── root.tsx
│   ├── entry.client.tsx
│   └── entry.server.tsx
│   └── tailwind.css
├── .eslintrc.cjs
├── .firebaserc
├── .gitignore
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## Contributors
- [Aidan Froggatt](https://www.aidanfroggatt.com)
