# Conditional status action

Flag your commit status based on the specified `context`. It is useful for when you need to block your commit until some external tool finishes its work.

Jenkins is a very useful example: it only marks you commit as `pending` when it get the commit to working on it. Before that, while the commit is in its queue, there is no status marked in the commit at all. If you have another external tool that marks the status as `success`, some automated process could merge it without wait for the CI (jenkins) status.

## How it works

* As soon as a push is sent, the action will flag your commit as `pending`.
* As soon as a new status of the specified `context` get in, the action will flag your commit according to gotten status.

## Example of action
```yml
name: Ready to be merged

on: [push, pull_request]

jobs:
  ready-to-be-merged:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v1
    - uses: actions/setup-node@v1
      with:
        node-version: '12.x'
    - uses: actions/setup-node@v1
      with:
        context: 'continuous-integration/jenkins/branch'
        token: ${{ secrets.GITHUB_TOKEN }}
```
