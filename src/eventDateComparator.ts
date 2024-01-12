/*
 * This file is part of the Cronica-IT project (https://github.com/cronica-it).
 * Copyright (c) 2023 Liviu Ionescu. All rights reserved.
 *
 * Permission to use, copy, modify, and/or distribute this software
 * for any purpose is hereby granted, under the terms of the MIT license.
 *
 * If a copy of the license was not distributed with this file, it can
 * be obtained from https://opensource.org/license/mit/.
 */

import type { BlogPost } from '@ilg/docusaurus-plugin-content-chronology';
import logger from '@docusaurus/logger'

const compareDates = ((aEventDate: Date, bEventDate: Date): number => {
    return bEventDate.getTime() - aEventDate.getTime();
})

export const eventDateComparator = ((a: BlogPost, b: BlogPost): number => {
    const aEventDate: Date = new Date(a.metadata.eventDateISO);
    const bEventDate: Date = new Date(b.metadata.eventDateISO);
    // logger.info(aEventDate);
    // logger.info(bEventDate);

    const value: number = compareDates(aEventDate, bEventDate);
    // logger.info(value)
    if (value !== 0) {
        return value
    }

    const aEventEndDate: Date = new Date(a.metadata.eventEndDateISO);
    const bEventEndDate: Date = new Date(b.metadata.eventEndDateISO);

    return compareDates(aEventEndDate, bEventEndDate)
})
