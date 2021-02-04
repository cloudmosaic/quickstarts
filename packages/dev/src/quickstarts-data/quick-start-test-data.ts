import { explorePipelinesQuickStart } from './mocks/json/explore-pipeline-quickstart';
import { exploreServerlessQuickStart } from './mocks/json/explore-serverless-quickstart';
import { monitorSampleAppQuickStart } from './mocks/json/monitor-sampleapp-quickstart';
import { QuickStart } from '@cloudmosaic/quickstarts';
import addHealthchecksQuickstart from './mocks/yamls/add-healthchecks-quickstart.yaml';
import installAssociatePipelineQuickstart from './mocks/yamls/install-associate-pipeline-quickstart.yaml';
import sampleApplicationQuickstart from './mocks/yamls/sample-application-quickstart.yaml';
import serverlessApplicationQuickstart from './mocks/yamls/serverless-application-quickstart.yaml';
import addHealthchecksQuickstartADoc from "raw-loader!./mocks/asciidoc/add-healthchecks-quickstart.adoc";
import { AsciiDocParser } from '@cloudmosaic/quickstarts';

export const allQuickStarts: QuickStart[] = [
  explorePipelinesQuickStart,
  exploreServerlessQuickStart,
  monitorSampleAppQuickStart,
  addHealthchecksQuickstart,
  installAssociatePipelineQuickstart,
  sampleApplicationQuickstart,
  serverlessApplicationQuickstart,
  AsciiDocParser(addHealthchecksQuickstartADoc)
];
