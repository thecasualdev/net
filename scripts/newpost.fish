if test (count $argv) -eq 0
    echo "Add a post title dumbass."
    exit 1
end

set -l title (string join ' ' $argv)
set -l slug (string lower -- $title | string replace -ra '[^a-z0-9]+' '-' | string trim -c '-')
set -l file "blog/$slug.svx"

if test -e $file
    echo "File already exists"
    exit 1
end

set -l now (date +%Y-%m-%dT%H:%M:%S%z | string replace -r '(\d\d)(\d\d)$' '$1:$2')

printf '%s\n' \
    --- \
    "title: \"$title\"" \
    "date: \"$now\"" \
    'description: ""' \
    'tags: []' \
    --- \
    ' ' >$file

echo "Created $file"
