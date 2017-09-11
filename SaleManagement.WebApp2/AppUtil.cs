using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Linq;

namespace SaleManagement.WebApp2
{
    public class AppUtil
    {
        public static string WebTitle = ConfigurationManager.AppSettings["WebTitle"];

        public static string WebVersion = $"{DateTime.Now:yyyyMMddHH}";

        public static List<T> ConvertTo<T>(DataTable datatable)
            where T : new()
        {
            var temp = new List<T>();
            try
            {
                var columnsNames = new List<string>();
                foreach (DataColumn dataColumn in datatable.Columns)
                    columnsNames.Add(dataColumn.ColumnName);
                temp = datatable.AsEnumerable()
                                .ToList()
                                .ConvertAll(row => GetObject<T>(row,
                                                                columnsNames));
                return temp;
            }
            catch
            {
                return temp;
            }
        }

        private static T GetObject<T>(DataRow row,
                                      List<string> columnsName)
            where T : new()
        {
            var obj = new T();
            try
            {
                var properties = typeof(T).GetProperties();
                foreach (var objProperty in properties)
                {
                    var columnname = columnsName.Find(name => name.ToLower() == objProperty.Name.ToLower());
                    if (!string.IsNullOrEmpty(columnname))
                    {
                        var value = row[columnname]
                                .ToString();
                        if (!string.IsNullOrEmpty(value))
                            if (Nullable.GetUnderlyingType(objProperty.PropertyType) != null)
                            {
                                value = row[columnname]
                                        .ToString()
                                        .Replace("$",
                                                 "")
                                        .Replace(",",
                                                 "");
                                objProperty.SetValue(obj,
                                                     Convert.ChangeType(value,
                                                                        Type.GetType(Nullable.GetUnderlyingType(objProperty.PropertyType)
                                                                                             .ToString())),
                                                     null);
                            }
                            else
                            {
                                value = row[columnname]
                                        .ToString()
                                        .Replace("%",
                                                 "");
                                objProperty.SetValue(obj,
                                                     Convert.ChangeType(value,
                                                                        Type.GetType(objProperty.PropertyType.ToString())),
                                                     null);
                            }
                    }
                }
                return obj;
            }
            catch
            {
                return obj;
            }
        }
    }
}
