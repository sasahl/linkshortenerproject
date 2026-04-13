---
name: security-audit
description: Perform a security audit of the codebase to identify potential vulnerabilities and security risks.
agent: ask
---

Perform a security and audit of the codebase to detect any potential vulnerabilities, insecure coding patterns, and areas where sensitive data may be exposed. Highlight any security risks and provide recommendations for mitigating them.

Output the findings as a markdown formatted table with the following columns (ID should start at 1 and auto-increment, FILE PATH should be an actual link to the file): "ID", "SEVERITY", "ISSUE", "FILE PATH", "LINE NUMBER(S)", and "RECOMMENDATION".

Next, ask the user which issues they want to fix by either replying 'All', or a comma separated list of ID's. After their reply, run a separate sub agent (#runSubagent) to fix each issue that the user has specified. Each subagent should report back with a simple `subAgentSuccess: true | false` for each issue it attempts to fix.