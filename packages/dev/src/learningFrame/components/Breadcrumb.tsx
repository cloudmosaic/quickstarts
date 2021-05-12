import React from "react";
import { Breadcrumb, BreadcrumbItem, Button } from "@patternfly/react-core";

export const TutorialBreadcrumb = ({
  basename,
  crumbs,
}: {
  basename: string;
  crumbs: string[];
}) => {
  return (
    <div className="tut-header">
      <Breadcrumb className="tut-header__body">
        {crumbs.map((chunk, index) => {
          console.log(crumbs.slice(0, index + 1).join("/"));
          if (index === 0) {
            return (
              <BreadcrumbItem
                key={`breadcrumb-base`}
                isActive={false}
                to={`${basename}`}
                className="tut-home"
              >
                <img
                  src="https://www.redhat.com/cms/managed-files/illustration_rhel-isometric.svg"
                  alt="Red Hat Enterprise Linux isometric illustration"
                  className="tut-img-fluid"
                />
                <span>Resources</span>
              </BreadcrumbItem>
            );
          }
          return (
            <BreadcrumbItem
              key={`breadcrumb-${chunk || "/"}`}
              // isActive={index === crumbs.length - 1}
              to={`${basename}${crumbs.slice(0, index + 1).join("/")}`}
            >
              {chunk.charAt(0).toUpperCase() + chunk.slice(1)}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
      <Button variant="link" style={{ color: 'white' }} onClick={ () => window.location.replace(basename) }>
        Return to tutorials
      </Button>
    </div>
  );
};
