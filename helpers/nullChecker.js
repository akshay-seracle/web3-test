/*jslint node: true */
'use strict';

const nullChecker = (value) => {
    return (value === undefined || value === 'undefined' || value === '' || value === null || value === 'null' || (Array.isArray(value) && !value.length));
};

module.exports = nullChecker;