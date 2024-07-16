
export const applySorting = (model, filters, sortField, sortOrder) => {
    if (sortField === 'categoryName') {
      return model.aggregate([
        { $match: filters },
        {
          $lookup: {
            from: 'categories', // Name of the Category collection
            localField: 'category',
            foreignField: '_id',
            as: 'categoryDetails'
          }
        },
        { $unwind: '$categoryDetails' },
        {
          $sort: {
            'categoryDetails.name': sortOrder
          }
        }
      ]);
    } else {
      return model.find(filters).sort({ [sortField]: sortOrder });
    }
  };
  