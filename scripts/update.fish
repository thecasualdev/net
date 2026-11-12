if test (count $argv) -eq 0
    echo 'Gimmie a file'
    exit 1
end

set -l file $argv[1]
if not string match -q '*.svx' -- $file
    set file "blog/$file.svx"
end

if not test -e $file
    echo "$file not found"
    exit 1
end

set -l now (date +%Y-%m-%dT%H:%M:%S%z | string replace -r '(\d\d)(\d\d)$' '$1:$2')
set -l tmp (mktemp)

awk -v now="$now" '
    /^---[[:space:]]*$/ { fences++; if (fences == 2 && !done) { print "updated: \"" now "\""; done = 1 } print; next }
    fences == 1 && /^updated:/ { if (!done) { print "updated: \"" now "\""; done = 1 } next }
    { print }
' $file >$tmp

mv $tmp $file

echo "Updated $file ($now)"
