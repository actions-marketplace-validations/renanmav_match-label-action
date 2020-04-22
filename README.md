# Match Label Action

This action locates one of a given list of labels in the labels active on the workflow issue. You can use this to change what actions run when a new issue is created, for instance.

## Inputs

### `allowed`

**Required** The labels to look for. Separate via commas or newlines (using a block string).

## Outputs

### `match`

The one label from the `allowed` list that was located. The action will fail if no labels matched or more than one was found.

## Example usage

```yaml
uses: renanmav/match-label-action@v4
with:
  allowed: >
    major
    minor
    patch
```
