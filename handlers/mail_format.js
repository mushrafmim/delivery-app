module.exports = `<!DOCTYPE html>
<html lang="en">
<body>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    NEW ORDER FROM {{shop}}.
    <dl>
        <dt>TITLE</dt>
        <dd>{{title}}</dd>
        <dt>DESCRIPTION</dt>
        <dd>{{description}}</dd>
    </dl>
    <a href="{{location}}">
        CHECK LOCATION
    </a>
    <br />
    <a href="{{link}}" target="_blank">
        <button class="btn btn-primary">CLAIM ORDER</button>
    </a>
</body>`