#!groovy

/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */


node('zlux-jenkins-agent') {

    def lib = library("jenkins-library").org.zowe.jenkins_shared_library
    def pipeline = lib.pipelines.nodejs.NodeJSPipeline.new(this)

    pipeline.admins.add("sgrady", "dnikolaev")

    pipeline.setup(
        packageName: "org.zowe.zlux.widgets",
        github: [
            email                      : lib.Constants.DEFAULT_GITHUB_ROBOT_EMAIL,
            usernamePasswordCredential : lib.Constants.DEFAULT_GITHUB_ROBOT_CREDENTIAL,
        ],
        artifactory: [
            url                        : lib.Constants.DEFAULT_ARTIFACTORY_URL,
            usernamePasswordCredential : lib.Constants.DEFAULT_ARTIFACTORY_ROBOT_CREDENTIAL,
        ],
        publishRegistry: [
            email                      : lib.Constants.DEFAULT_NPM_PRIVATE_REGISTRY_EMAIL,
            usernamePasswordCredential : lib.Constants.DEFAULT_NPM_PRIVATE_REGISTRY_CREDENTIAL,
        ],
        disableLint: true,
        disableAudit: true,
    )

    pipeline.sonarScan(
        scannerServer: lib.Constants.DEFAULT_SONARQUBE_SERVER,
        scannerTool:   lib.Constants.DEFAULT_SONARQUBE_SCANNER_TOOL
    )
    pipeline.build()
    pipeline.test(name: "Unit tests", junit : "unit-tests-report.xml")
    pipeline.publish()
    pipeline.release()

    pipeline.end()
}


/**
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */
