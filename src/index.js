const github = require('@actions/github')
const core = require('@actions/core')

const token = core.getInput('token');
const context = core.getInput('context')

const octokit = new github.GitHub(token)
const hookContext = github.context

if (hookContext.eventName === 'status') {
  if (context === hookContext.payload.context) {
    if (['success', 'pending'].includes(hookContext.payload.state)) {
      octokit.repos.createStatus({
        ...hookContext.repo,
        sha: hookContext.sha,
        state: hookContext.payload.state,
        context: 'conditional-status'
      })
    }

    if (['failure', 'error'].includes(hookContext.payload.state)) {
      octokit.repos.createStatus({
        ...hookContext.repo,
        sha: hookContext.sha,
        state: 'error',
        context: 'conditional-status'
      })
    }
  }
}
