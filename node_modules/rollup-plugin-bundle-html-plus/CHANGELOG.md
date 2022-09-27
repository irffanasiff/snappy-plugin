## 1.4.0
* Fix `scriptType` are not applied to regular script tag.

## 1.3.0 (2019-03-10)
* New external content type. Now any content can be injected via `externals` array using `content` field.
* External resource now can have own `inject` property which will re-write general one.

## 1.2.1 (2019-03-03)
* Update README.

## 1.2.0 (2019-03-03)
* Dependencies updated.
* Many improvements from @thomzz in original repo (`inline`, `clean`, etc.)
* Now ignored files (`ignore` option) not cleaning.
* External files now can be enjected to the final html as is, without any additional processing.

## 0.2.2 (2019-10-17)
* Added: Parameter for onlinePath prefix to the files.
## 0.2.0 (2019-05-21)
* Updated: rollup is updated to v1.1.0.
* updated: onwrite hook is replaced by writeBundle.
## 0.1.5 (2019-03-21)
* added: support for HTML code string as template.
## 0.1.3 (2018-10-10)
* fixed: sourcemap is not hashed.
