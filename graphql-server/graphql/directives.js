import dateformat from "dateformat";
import { SchemaDirectiveVisitor } from "apollo-server-express";
import { defaultFieldResolver, GraphQLString, GraphQLID } from "graphql";
import { createHash } from "crypto";

export class FormattableDateDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;

    field.args.push({
      name: "format",
      type: GraphQLString
    });

    field.resolve = async (source, { format, otherArgs }, ...args) => {
      const value = await resolve.call(this, source, otherArgs, ...args);
      return dateformat(value, format || defaultFormat);
    };
  }
}

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    this.ensureFieldWrapped(details.objectType);
  }

  visitObject(object) {
    this.ensureFieldWrapped(object);
  }

  ensureFieldWrapped(objectType) {}
}

export class UniqueIdDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    const { name, from } = this.args;
    const fields = type.getFields();

    if (name in fields) {
      throw new Error(`Conflicting field name ${name}`);
    }

    console.log(name, "name");
    fields[name] = {
      name,
      type: GraphQLID,
      args: [],
      resolve() {
        const hash = createHash("sha1");
        hash.update(type.name);

        from.forEach(fieldName => hash.update(fieldName));

        return hash.digest("hex");
      }
    };

    // const {resolve = defaultFieldResolver} =
    console.log(type, "type from L:36");
  }
}
