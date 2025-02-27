// De'Ante Agleham
$(document).ready(function () {
    // Form validation
    $("#order").click(formHandler);

    // Changes text when a month is selected from dropdown
    $(".month").on("click", textHandler);
});

formHandler = function(event) {
    var instr = document.getElementById("instructions").value;
    var key = "vegan";
    if (instr.match(key)) {
        var warning = document.createTextNode(" Warning! Contains dairy.");
        $("#note").append(warning);
    } else {
        function getSelectedFlavor() {
            let flavors = document.getElementsByName('flavor');
            for (let i = 0; i < flavors.length; i++) {
                if (flavors[i].checked) {
                    return flavors[i].value;
                }
            }
            return null;
        }

        var topping = getSelectedFlavor();

        // Thank you message and order details
        $(".hide").hide();
        $("body").append("Thank you! Your order has been placed<br>");
        $("body").append("Topping: " + topping + "<br>");
        $("body").append("Quantity: " + document.getElementById("quantity").value + "<br>");
        $("body").append("Notes: " + instr);
    }
}

textHandler = function(event) {
    var val = $(this).val();
    var month = $(this).text();
    $(".dropbtn").val(val);
    $(".dropbtn").text(month);

    $.post("/orders", { month: val }, function (data) {
        var orderHTML = '';
        data.data.forEach(function(order) {
            orderHTML += '<p>' + order.topping + ': ' + order.quantity + '</p>';
        });
        $("#ordersJSON").html(orderHTML);
    });
}
