/*jslint browser: true*/
/*global $, jQuery, alert*/

$(window).load(function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var canvasOffset = $("#canvas").offset();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;

    var startX;
    var startY;
    var isDown = false;

    var cx = canvas.width / 2;
    var cy = canvas.height / 2;
    var w;
    var h;
    var bw;
    var bh;
    var r = 0;

    var img = new Image();
    var bottom = new Image();
    img.onload = function () {
        w = img.width / 2;
        h = img.height / 2;
        draw();
    }
    bottom.onload = function () {
        bw = bottom.width / 2;
        bh = bottom.height / 2;
        draw();
    }
    img.src = "symmetric_top.png";
    bottom.src = "symmetric_bottom.png";
    //asymmetric_bottom.png
    //asymmetric_private_top.png
    //asymmetric_public_top.png
    //symmetric_bottom.png
    //symmetric_top.png


    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawRotationHandle(true);
        drawRect();
    }

    function drawRect() {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.drawImage(bottom, 0, 0, bottom.width, bottom.height, -bw / 2, -bh / 2, bw, bh);
        ctx.rotate(r);
        ctx.drawImage(img, 0, 0, img.width, img.height, -w / 2, -h / 2, w, h);
        //    ctx.fillStyle="yellow";
        //    ctx.fillRect(-w/2,-h/2,w,h);
        ctx.restore();
    }

    function drawRotationHandle(withFill) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(r);
        ctx.beginPath();
        ctx.moveTo(0, -1);
        ctx.lineTo(w / 2 + 20, -1);
        ctx.lineTo(w / 2 + 20, -7);
        ctx.lineTo(w / 2 + 30, -7);
        ctx.lineTo(w / 2 + 30, 7);
        ctx.lineTo(w / 2 + 20, 7);
        ctx.lineTo(w / 2 + 20, 1);
        ctx.lineTo(0, 1);
        ctx.closePath();
        if (withFill) {
            ctx.fillStyle = "blue";
            ctx.fill();
        }
        ctx.restore();
    }



    function handleMouseDown(e) {
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        drawRotationHandle(false);
        isDown = ctx.isPointInPath(mouseX, mouseY);
        console.log(isDown);
    }

    function handleMouseUp(e) {
        isDown = false;
    }

    function handleMouseOut(e) {
        isDown = false;
    }

    function handleMouseMove(e) {
        if (!isDown) {
            return;
        }

        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);
        var dx = mouseX - cx;
        var dy = mouseY - cy;
        var angle = Math.atan2(dy, dx);
        r = angle;
        draw();
    }

    $("#canvas").mousedown(function (e) {
        handleMouseDown(e);
    });
    $("#canvas").mousemove(function (e) {
        handleMouseMove(e);
    });
    $("#canvas").mouseup(function (e) {
        handleMouseUp(e);
    });
    $("#canvas").mouseout(function (e) {
        handleMouseOut(e);
    });
});