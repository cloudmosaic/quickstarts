import {QuickStart, QuickStartTask} from "@quickstarts/utils/quick-start-types";


export const ProcedureAdocHtmlParser = (body: string, id: string, options: any = {}, environmentVariables: {[name: string]: string}) => {

  const replaceEnvironmentVariables = (s: string | undefined) => s?.replace(/\${\w+}/, (substring, name) => environmentVariables[name] ? environmentVariables[name]  : substring);


  const bodyDOM = document.createElement('body');
  bodyDOM.innerHTML = body;

  const displayName = bodyDOM.querySelector("header").textContent.trim();
  const introduction = bodyDOM.querySelector(".qs-intro")?.innerHTML.trim();
  const prereqs = bodyDOM.querySelectorAll(".qs-prerequisites ul li");
  const procedures = bodyDOM.querySelectorAll(".qs-task");
  const duration = bodyDOM.querySelector(".qs-duration")?.textContent.trim();
  const durationMinutes = parseInt(duration.match(/\d+/)[0]);
  const icon = bodyDOM.querySelector(".qs-icon .icon")?.innerHTML.trim();
  const description = bodyDOM.querySelector(".qs-description")?.innerHTML.trim();
  const conclusion = bodyDOM.querySelector(".qs-conclusion")?.innerHTML.trim();

  let prerequisites: string[] = [];
  prereqs.forEach(n => {
    prerequisites.push(n.textContent.trim())
  });

  let qsTasks: QuickStartTask[] = [];
  procedures.forEach((procedure, index) => {
    qsTasks.push({
      title: procedure.querySelector(".qs-task-title")?.textContent.trim(),
      description: procedure.querySelector(".qs-task-description")?.innerHTML.trim() + replaceEnvironmentVariables(procedure.querySelector(".olist")?.innerHTML.trim()),
      review: {
        instructions: procedure.querySelector(".qs-review.instructions")?.innerHTML.trim() || "Have you completed these steps?",
        failedTaskHelp: procedure.querySelector(".qs-review.failed")?.innerHTML.trim() ||"This task isn’t verified yet. Try the task again.",
      },
      summary: {
        success: procedure.querySelector(".qs-summary.success")?.innerHTML.trim() ||"You have completed this task!",
        failed: procedure.querySelector(".qs-summary.failed")?.innerHTML.trim() ||"Try the steps again.",
      },
    });
  });

  const processedAsciiDoc: QuickStart = {
    metadata: {
      name: id,
    },
    spec: {
      displayName: displayName,
      durationMinutes,
      icon,
      description,
      introduction,
      conclusion,
      prerequisites,
      nextQuickStart: ["todo"],
      tasks: qsTasks,
    },
  };
  return processedAsciiDoc;
};
