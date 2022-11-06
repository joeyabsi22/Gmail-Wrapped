function extractEmail(nameAndEmail) {
    var email = "";
    for (var i = nameAndEmail.length - 1; i >= 0; i--) {
        if (nameAndEmail[i] === '<') {
            email = nameAndEmail.slice(i + 1);
            break;
        }
    }
    email.replace('>', '');
    return email;
}

function extractAllEmails(unfilteredList) {
    var filteredList = new Array();
    for (var i = 0; i < unfilteredList.length; i++) {
        filteredList.push(extractEmail(unfilteredList[i]));
    }
    return filteredList;
}

// returns list of senders, each expressed as a list with the format [sender name (str), count (int)]
function getSortedSenderCounts(listOfSenders) {

    // array of len 2 arrays, each formatted [sender name (str), count (int)]
    var counts = new Array();

    // iterates thru each email sender
    for (var i = 0; i < listOfSenders.length; i++) {

        var found = false;

        // iterates thru current counts
        for (var j = 0; j < counts.length; j++) {
            // if counts already contains the sender
            if (listOfSenders[i] === counts[j][0]) {

                found = true;

                // increment the count in [sender, count]
                counts[j][1] += 1;

                // BEGIN SORTING:
                // grap the [sender, count]
                var temp = counts[j];

                // take [sender, count] out
                counts.splice(j, 1);
                // go backwards, look for new place to insert [sender, count] based on count
                for (var k = j - 1; k >= 0; k--) {
                    // if count >= current count we are iterating at index k
                    if (counts[k][1] <= temp[1]) {
                        // insert at index k
                        counts.splice(k, 0, temp);
                        break;
                    }
                    // if we reached the beginning (i.e count is smaller than all before it)
                    if (k == 0) {
                        // put it back at j (i.e we don't need to move it)
                        counts.splice(j, 0, temp);
                    }
                }
                // END SORTING

                // we found it, break out of for loop
                break;
            }
        }

        // if it wasn't already in counts, add it to the end
        if (!found) {
            counts.push([listOfSenders[i], 1]);
        }
    }

    return counts;
}