/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import ExtensionAPI from '../ExtensionAPI';
import GlobalModel from '../model/Global';
import {createOrUpdatePatternFromDecal} from '../util/decal';

export default function (ecModel: GlobalModel, api: ExtensionAPI) {
    ecModel.eachRawSeries(seriesModel => {
        const data = seriesModel.getData();

        if (data.hasItemVisual()) {
            data.each(idx => {
                const decal = data.getItemVisual(idx, 'decal');
                if (decal) {
                    const itemStyle = data.ensureUniqueItemVisual(idx, 'style');
                    itemStyle.decal = createOrUpdatePatternFromDecal(decal, api);
                }
            });
        }
        else {
            const decal = data.getVisual('decal');
            if (decal) {
                const style = data.getVisual('style');
                style.decal = createOrUpdatePatternFromDecal(decal, api);
            }
        }
    });
}
