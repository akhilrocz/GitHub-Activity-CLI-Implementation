import https from "https";

const username = process.argv[2];   //retrieves second command-line argument 

if (!username) {
  console.log("Please provide a GitHub username.");
  console.log(`Usage: github-activity ${username}`);
  process.exit(1);
}

const options = {
  hostname: "api.github.com",
  path: `/users/${username}/events`,
  headers: {
    "User-Agent": "GitHub-Activity-CLI",
  },
};

function formatEventType(event) {
  switch (event.type) {
    case "PushEvent":
      return `Pushed ${event.payload.commits?.length || 0} commits to ${
        event.repo.name
      }`;
    case "IssuesEvent":
      return `Opened a new issue in ${event.repo.name}`;
    case "PullRequestEvent":
      return `${event.payload.action} a pull request in ${event.repo.name}`;
    case "WatchEvent":
      return `Starred ${event.repo.name}`;
    case "ForkEvent":
      return `Forked ${event.repo.name}`;
    case "CreateEvent":
      return `Created ${event.payload.ref_type} ${event.payload.ref || ""} in ${
        event.repo.name
      }`;
    default:
      return `${event.type} in ${event.repo.name}`;
  }
}

https
  .get(options, (res) => {
    let data = "";
    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      if (res.statusCode === 404) {
        console.log("Error: User not found.");
        process.exit(1);
      }

      if (res.statusCode !== 200) {
        console.log("Error: Failed to fetch user activity");
        process.exit(1);
      }

      try {
        const events = JSON.parse(data);
        if (events.length === 0) {
          console.log("No recent activity found.");
          return;
        }
        console.log(`\nRecent GitHub activity for ${username}:\n`);
        events.slice(0, 10).forEach((event, index) => {
          console.log(`${index + 1}. ${formatEventType(event)}`);
        });
      } catch (error) {
        console.error("Error: Failed to parse response");
        process.exit(1);
      }
    });
  })
  .on("error", (error) => {
    console.error("Error:", error.message);
    process.exit(1);
  });
