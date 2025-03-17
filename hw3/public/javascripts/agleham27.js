// De'Ante Agleham
$(document).ready(function () {
    // Form validation
    $("#order").click(formHandler);

    // Changes text when a month is selected from dropdown
    $(".month").on("click", textHandler);
});

formHandler = function (event) {
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
        var quantity = document.getElementById("quantity").value;

        console.log("Sending data to server:", { topping: topping, quantity: quantity, instr: instr }); // Debugging
        $.post("/neworders", { topping: topping, quantity: quantity, instr: instr }, function (data) {
            console.log("Server response: ", data);
            console.log("Order details to send to server: ", topping, quantity, instr);
        });

        // Thank you message and order details
        $(".hide").hide();
        $("body").append("Thank you! Your order has been placed<br>");
        $("body").append("Topping: " + topping + "<br>");
        $("body").append("Quantity: " + quantity + "<br>");
        $("body").append("Notes: " + instr);
    }
};

textHandler = function(event) {
    // Retrieve the value and text of the clicked option
    var val = $(this).attr("value");
    var month = $(this).text();

    // Update the dropdown button's value and text
    $(".dropbtn").val(val); // This line updates the button's value
    $(".dropbtn").text(month);

    console.log(val);
    console.log(month);

    // Make a POST request to the server with the selected month
    $.post("/orders", { month: val }, function (data) {
        console.log("Server response: ", data); // Debug log
        console.log("Month to send to server: ", val);

        var orderHTML = '';
        
        // Generate order details dynamically
        data.data.forEach(function(order) {
            orderHTML += '<p>' + order.name + ': ' + order.quantity + ' (' + order.notes + ')</p>';
        });

        // Update the orders section with the fetched data
        $("#ordersJSON").html(orderHTML);
    }).fail(function() {
        // Error handling
        $("#ordersJSON").html("<p>Error fetching orders. Please try again.</p>");
    });
}
