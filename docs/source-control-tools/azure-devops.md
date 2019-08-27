# Azure DevOps

[Main Link](https://dev.azure.com/enfrasysdev/)

## How to add Pipelines script inside repository for automated build

#### 1. Go to the main directory of your project's repository.

#### 2. Paste the following YAML script into a `<filename>.yml` file.

```yaml
trigger:
  - master

pool:
  vmImage: "ubuntu-latest"

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: "10.x"
    displayName: "Install Node.js"

  - script: |
      npm install
      npm run build
    displayName: "npm install and build"

  - task: CopyFiles@2
    inputs:
      SourceFolder: "$(Build.SourcesDirectory)/dist"
      Contents: "**"
      TargetFolder: "$(Build.ArtifactStagingDirectory)"

  - task: PublishBuildArtifacts@1
    inputs:
      PathtoPublish: "$(Build.ArtifactStagingDirectory)"
      ArtifactName: "drop"
      publishLocation: "Container"
```

#### 3. Go to `Pipelines -> Builds` within your project in Azure DevOps.

<img :src="$withBase('/images/azure-devops-addscript01.png')" style="box-shadow:0 5px 10px 0px rgba(0,30,0,0.2);border:1px solid #99a;margin-top:25px">

#### 4. Select the repo provider containing your codebase.

<img :src="$withBase('/images/azure-devops-addscript02.png')" style="box-shadow:0 5px 10px 0px rgba(0,30,0,0.2);border:1px solid #99a;margin-top:25px">

#### 5. In the `Configure your pipeline` tab, choose `Existing Azure Pipelines YAML file` in your repository.

#### 6. Proceed with necessary prompts/steps to finish.

<!-- TODO: elaborate more on steps after this -->
