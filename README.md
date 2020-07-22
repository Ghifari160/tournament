# Tournament

Tournament (a better name is in the works) is tournament management app. It is work in progress
and, at the moment, only the bracket and competitors page are working. The public interface footer
and navigation bars are both configurable with Markdown support.

You can see this project in action [here](https://tournament.ghifari160.com/).

## Installation

Ensure that Node.JS is installed. If not, you can download it [here](https://nodejs.org/en/).

Download the release distribution from the
[release page](https://github.com/Ghifari160/tournament/releases).

Install the production dependencies for ths project.

``` shell
npm i --only=prod
```

Run the server.

``` shell
npm run start
```

You can terminate the server by pressing <kbd>Ctrl</kbd> + <kbd>C</kbd>.

You can configure the bracket data by modifying `data/bracket.json` and the competitors data by
modifying `data/competitors.json`. The public web interface header, navigation bar, and footer are
configurable in `config.json`. Changes to `config.json` will not apply until a server restart,
whereas changes to `data/bracket.json` and `data/competitors.json` applies instantly.

**Important:** The server included in this project is not intended to run behind a reverse proxy like
[NGINX](https://www.nginx.com/). If you choose to run this server without a reverse proxy, you may do
so at your own risk.

## Contributing

Ensure that Node.JS is installed. If not, you can download it [here](https://nodejs.org/en/).

Ensure that Git is installed.

### Preparing the dev environment

Clone the repository and enter the directory.

``` shell
git clone https://github.com/Ghifari160/tournament.git
cd tournament
```

Install all dependencies for this project.

``` shell
npm i
```

Run the server to generate the initial data.

``` shell
npm run start
```

Set `server.dev` in `config.json` to `true`. Terminate the server by pressing
<kbd>Ctrl</kbd> + <kbd>C</kbd>. Start the server again.

### Packaging for release

Make sure all changes are committed, pushed to origin, and approved for release.

Run the build script.

``` shell
npm run build
```

**Important:** Do **NOT** run this command without first committing changes to Git. This command will
delete the following directories:

``` text
src/admin/
src/common/
src/public/
```

Manually delete the following files and directories (make sure you store a backup if you intend on
using the same data to continue development work on this project):

``` text
config.json
data/
```

Package up the remaining files and directories.
