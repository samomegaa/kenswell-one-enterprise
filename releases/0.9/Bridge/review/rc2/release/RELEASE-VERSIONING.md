# RC2-D2 — Release Versioning & Tagging Automation

## Objective

Add repeatable release metadata and safe tagging automation for Kenswell One Bridge.

## Release Metadata

```text
release/release.json
Release Notes
release/RELEASE-NOTES-RC2.md
Version
0.9.0-rc2
Tag
v0.9.0-rc2
Print Release Version
npm run bridge:release:version
Verify Release Metadata
npm run bridge:rc2:release
Create Tag

Only after the working tree is clean:

releases/0.9/Bridge/release/create-release-tag.sh

Then push manually:

git push origin v0.9.0-rc2
Safety

The tag script refuses to run when:

the current directory is not a Git repository
the working tree has uncommitted changes
the tag already exists
